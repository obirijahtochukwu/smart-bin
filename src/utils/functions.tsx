import { useEffect, useState } from "react";
import { bin, store as storeTypes, zone } from "./types";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { addBins, addUserAuth, addZones, getBins } from "../redux/authSlice";
// import { auth } from "./constants";
// import { dispatch } from '@/utils/functions';

interface form {
  url: string;
  form: any;
}

const setStore = ({ title, value }: storeTypes) => {
  localStorage.setItem(title, JSON.stringify(value));
};

const getStore = (title: string) => {
  // @ts-ignore
  const data = JSON.parse(localStorage?.getItem(title));
  return data;
};

const useLogin = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const login = (form: any, e: any) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_URL}login/`, { ...form })
      .then((res: any) => {
        localStorage.setItem("auth", JSON.stringify(res.data));
        dispatch(addUserAuth(res.data));
        setLoading(false);
        window.location.href = "/";
      })
      .catch((err: any) => {
        setLoading(false);
        const error: string[] | any = Object.values(err.response.data)[0];
        console.log(err.response.data);
        console.log(error.toString());
        toast.error(
          error.toString().charAt(0).toUpperCase() + error.toString().slice(1)
        );
      });
  };

  return { loading, login };
};

const useSignup = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const signup = (form: any, e: any) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_URL}register/`, { ...form })
      .then((res) => {
        console.log(res);
        localStorage.setItem("auth", JSON.stringify(res.data));
        dispatch(addUserAuth(res.data));
        toast.success(
          "Congratulations! You have successfully created your account"
        );
        setLoading(false);
        setTimeout(() => {
          window.location.href = "/";
        }, 4000);
      })
      .catch((err) => {
        const error: string[] | any = Object.values(err.response.data)[0];
        toast.error(
          error.toString().charAt(0).toUpperCase() + error.toString().slice(1)
        );
        setLoading(false);
      });
  };

  return { loading, signup };
};

const logout = () => {
  localStorage.removeItem("auth");
  window.location.href = "/login";
};

const dispatchAction = (e: any) => {
  const action = useDispatch();
  const dispatch = () => {
    action(e);
  };
  return dispatch;
};

const auth = getStore("auth");

const usePost = ({ url, form }: form) => {
  const { user_id } = useSelector((state: any) => state.user.auth);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>({});
  const { fetch } = useGet(url.includes("zone") ? "zones/" : "bins/");

  const post = (e: any) => {
    e.preventDefault();

    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API_URL + url}`,
        { ...form, user: user_id },
        {
          headers: { Authorization: `Token ${auth.token}` },
        }
      )
      .then((res) => {
        fetch();
        console.log(res.data);
        setData(res.data);
        fetch();
        toast.success(
          `New ${url.includes("zone") ? "zone" : "bin"} "${
            res.data.name
          }" has been created! 🎉`
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return { loading, data, post };
};

const useGet = (url: string) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetch = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL + url}`, {
        headers: { Authorization: `Token ${auth?.token}` },
      })
      .then((res) => {
        console.log(res);
        // const jo = res.data;
        // if (url.includes("zones")) {
        //   dispatch(addZones(res.data));
        // }
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  {
  }

  return { isLoading: loading, fetchedData: data, fetch };
};

const useDelete = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<zone[] | bin[] | any>([]);

  const deleteItem = ({
    url,
    id,
    data,
  }: {
    url: string;
    id?: string | number;
    data: zone[] | bin[];
  }) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL + url}`, {
        headers: { Authorization: `Token ${auth.token}` },
      })
      .then((res) => {
        const { name }: string | any = data.find(
          (item: zone | bin) => item.id === id
        );
        const items = data.filter((item) => item.id !== id);
        setData(items);
        toast.success(`You have successfully deleted  "${name} 🎉"`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { deleteItem, data };
};

const usePut = () => {
  const [loading, setLoading] = useState("");
  const [data, setData] = useState<zone[] | bin[]>([]);
  const { user_id } = useSelector((state: any) => state.user.auth);

  const modify = ({
    url,
    form,
    data,
  }: {
    url: string;
    form: any;
    data: zone[] | bin[];
  }) => {
    setLoading("pending");
    axios
      .put(
        `${process.env.REACT_APP_API_URL + url}`,
        { ...form, user: user_id },
        {
          headers: { Authorization: `Token ${auth.token}` },
        }
      )
      .then((res) => {
        const target = data.findIndex(
          (obj: any) => obj.id === Number(url?.match(/\d/g)?.join(""))
        );
        const newData = [...data];
        newData[target] = res.data;
        console.log(newData);

        setData(newData);
        setLoading("success");
        toast.success(`You have successfully modified "${res.data.name}" 🎉`);
      })
      .catch((err) => {
        console.log(err);
        setLoading("");
      });
  };

  return { loading, modify, modifyData: data };
};

export {
  setStore,
  getStore,
  useLogin,
  useSignup,
  logout,
  dispatchAction,
  usePost,
  useGet,
  useDelete,
  usePut,
};
