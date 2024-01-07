export interface hide {
  hide?: boolean;
}

export interface className {
  className?: string;
  onClick?: any;
}
//

export interface input {
  name?: string;
  placeholder?: string;
  type?: string;
  icon?: any;
  className?: string;
  Icon?: React.JSX.Element;
  objectKey?: string | any;
  value?: string;
  onChange?: any;
  loading?: boolean;
}

export interface tabs {
  name?: string | any;
  tabTitle?: string;
  icon?: React.JSX.Element;
  component?: React.JSX.Element;
}

export interface user {
  username?: string | any;
  email?: string;
  user_id?: number;
  token?: string;
}

export interface store {
  title?: string | any;
  value?: any;
}

export interface zone {
  address?: string;
  id?: string;
  zone_id?: string;
  name?: string;
  pickup_level?: string;
  // zones?: zone[];
}

export interface marker {
  lat?: string | any;
  lng?: string | any;
  fill_level?: string;
}

export interface bin {
  Address?: string;
  "Battery Voltage"?: number;
  "Filled Level"?: number;
  Latitude?: number;
  Longitude?: number;
  "Signal Level"?: number;
  id?: string | number;
  name?: string;
  address?: string;
  zone?: string | number;
  fill_level?: string;
}
