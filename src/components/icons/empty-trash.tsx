import { className } from "@/utils/types";
import React from "react";

export const EmptyTrashIcon: React.FC<className> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
    >
      <g clip-path="url(#clip0_3_214)">
        <path
          d="M22.2116 2.18608H16.8397V1.67355C16.8397 0.75075 16.089 0 15.1662 0H10.8336C9.91084 0 9.16009 0.75075 9.16009 1.67355V2.18613H3.78829C2.8655 2.18613 2.11475 2.93688 2.11475 3.85968V5.15871C2.11475 5.26646 2.15755 5.36979 2.23373 5.44598C2.30992 5.52216 2.41325 5.56496 2.521 5.56496H3.41145L4.56164 24.4284C4.61537 25.3097 5.34911 26 6.23214 26H19.7678C20.6508 26 21.3845 25.3097 21.4382 24.4284L22.5884 5.56496H23.4789C23.5866 5.56496 23.69 5.52216 23.7661 5.44598C23.8423 5.36979 23.8851 5.26646 23.8851 5.15871V3.85963C23.8851 2.93683 23.1344 2.18608 22.2116 2.18608ZM9.97259 1.67355C9.97259 1.19879 10.3588 0.8125 10.8336 0.8125H15.1662C15.641 0.8125 16.0272 1.19874 16.0272 1.67355V2.18613H9.97259V1.67355ZM20.6272 24.3789C20.5995 24.8323 20.222 25.1875 19.7677 25.1875H6.23214C5.77785 25.1875 5.40029 24.8323 5.37267 24.3789L4.22547 5.56486H21.7744L20.6272 24.3789ZM23.0726 4.75236H2.92725V3.85963C2.92725 3.38487 3.31349 2.99858 3.78829 2.99858H22.2116C22.6864 2.99858 23.0726 3.38482 23.0726 3.85963V4.75236H23.0726ZM15.5147 16.1001C15.5009 16.1516 15.4974 16.2054 15.5043 16.2583C15.5113 16.3111 15.5286 16.3621 15.5553 16.4083L16.0729 17.3048H14.7301V16.6613C14.7301 16.5802 14.7058 16.5008 14.6603 16.4336C14.6148 16.3664 14.5502 16.3144 14.4749 16.2842C14.3995 16.254 14.3168 16.2471 14.2375 16.2644C14.1582 16.2816 14.0859 16.3223 14.0299 16.381L12.0134 18.4963C11.9414 18.5718 11.9012 18.6722 11.9012 18.7765C11.9012 18.8809 11.9414 18.9813 12.0134 19.0568L14.0299 21.1721C14.0859 21.2308 14.1582 21.2715 14.2375 21.2888C14.3168 21.306 14.3995 21.2991 14.4749 21.2689C14.5502 21.2387 14.6148 21.1867 14.6603 21.1195C14.7058 21.0522 14.7301 20.9729 14.7301 20.8918V20.2482H17.8982C18.2296 20.2482 18.5264 20.0769 18.6921 19.7899L19.5347 18.3306C19.7004 18.0436 19.7004 17.7009 19.5346 17.4138L18.1044 14.9366C18.0505 14.8433 17.9618 14.7752 17.8577 14.7473C17.7536 14.7194 17.6428 14.734 17.5495 14.7879L15.704 15.8534C15.6578 15.8801 15.6173 15.9156 15.5848 15.9579C15.5523 16.0002 15.5285 16.0486 15.5147 16.1001ZM17.9885 19.3836C17.9674 19.4202 17.9404 19.4358 17.8982 19.4358H14.3239C14.2161 19.4358 14.1128 19.4786 14.0366 19.5548C13.9604 19.6309 13.9176 19.7343 13.9176 19.842V19.8769L12.8687 18.7766L13.9176 17.6762V17.7111C13.9176 17.8189 13.9604 17.9222 14.0366 17.9984C14.1128 18.0746 14.2161 18.1174 14.3239 18.1174H18.574C18.6266 18.1174 18.6781 18.1123 18.7281 18.1026L17.9885 19.3836ZM17.6039 15.6947L18.5335 17.3048H17.0111L16.462 16.3538L17.6039 15.6947ZM10.0819 11.9621L11.9274 13.0275C12.0207 13.0814 12.1315 13.0959 12.2356 13.0681C12.3397 13.0402 12.4284 12.9721 12.4823 12.8788L12.9999 11.9823L13.6713 13.1452L13.114 13.4669C13.0437 13.5075 12.9872 13.5682 12.9518 13.6413C12.9163 13.7143 12.9035 13.7962 12.9151 13.8766C12.9266 13.9569 12.962 14.0319 13.0166 14.092C13.0712 14.1521 13.1425 14.1944 13.2214 14.2135L16.0615 14.9022C16.0929 14.9099 16.1251 14.9138 16.1574 14.9138C16.2452 14.9137 16.3305 14.8852 16.4007 14.8326C16.4709 14.78 16.5222 14.7061 16.547 14.622L17.3707 11.8181C17.3935 11.7402 17.3925 11.6572 17.3678 11.5799C17.3431 11.5026 17.2958 11.4345 17.232 11.3843C17.1682 11.3341 17.0909 11.3042 17.0099 11.2984C16.9289 11.2926 16.8481 11.3112 16.7778 11.3517L16.2205 11.6735L14.6364 8.92988C14.4707 8.64287 14.174 8.47153 13.8425 8.47153H12.1574C11.8259 8.47153 11.5291 8.64292 11.3635 8.92988L9.93328 11.4071C9.90659 11.4533 9.88927 11.5043 9.88229 11.5572C9.87532 11.6101 9.87883 11.6639 9.89263 11.7154C9.90644 11.7669 9.93026 11.8152 9.96274 11.8576C9.99521 11.8999 10.0357 11.9354 10.0819 11.9621ZM13.9328 9.33608L15.7199 12.4316C15.7737 12.5248 15.8624 12.5929 15.9665 12.6209C16.0706 12.6487 16.1814 12.6341 16.2747 12.5803L16.305 12.5629L15.8765 14.0214L14.3991 13.6632L14.4293 13.6457C14.4755 13.6191 14.516 13.5836 14.5485 13.5412C14.5809 13.4989 14.6048 13.4506 14.6186 13.3991C14.6324 13.3476 14.6359 13.2938 14.6289 13.2409C14.622 13.188 14.6047 13.137 14.578 13.0908L12.4529 9.41007C12.4271 9.3653 12.397 9.32311 12.3631 9.28408H13.8423C13.8846 9.28398 13.9116 9.29957 13.9328 9.33608ZM11.7696 9.85136L12.5308 11.1698L11.9818 12.1207L10.84 11.4615L11.7696 9.85136ZM7.30769 19.7899C7.47344 20.0769 7.77015 20.2483 8.10165 20.2483H10.9622C11.0699 20.2483 11.1732 20.2055 11.2494 20.1293C11.3256 20.0531 11.3684 19.9498 11.3684 19.842V17.7111C11.3684 17.6033 11.3256 17.5 11.2494 17.4238C11.1732 17.3476 11.0699 17.3048 10.9622 17.3048H9.92693L10.5983 16.1419L11.1556 16.4637C11.2259 16.5043 11.3068 16.523 11.3878 16.5172C11.4688 16.5114 11.5462 16.4815 11.61 16.4313C11.6738 16.3811 11.7211 16.3129 11.7458 16.2356C11.7705 16.1582 11.7714 16.0753 11.7485 15.9974L10.9249 13.1935C10.8954 13.0933 10.8286 13.0084 10.7382 12.9562C10.6478 12.904 10.5408 12.8886 10.4394 12.9132L7.59927 13.6019C7.52038 13.621 7.44903 13.6633 7.39442 13.7234C7.33981 13.7834 7.30444 13.8585 7.29288 13.9388C7.28132 14.0192 7.2941 14.1011 7.32957 14.1742C7.36504 14.2472 7.42157 14.3079 7.49187 14.3485L8.0492 14.6702L6.46518 17.4138C6.29948 17.7008 6.29948 18.0435 6.46523 18.3306L7.30769 19.7899ZM10.5559 18.1173V19.4358H8.69661L9.45782 18.1173H10.5559ZM7.16885 17.8201L8.956 14.7247C8.9827 14.6785 9.00004 14.6275 9.00702 14.5746C9.01401 14.5217 9.01049 14.4679 8.99668 14.4164C8.98287 14.3649 8.95904 14.3165 8.92655 14.2742C8.89405 14.2319 8.85353 14.1964 8.80731 14.1697L8.77709 14.1523L10.2545 13.7941L10.6829 15.2527L10.6528 15.2352C10.6066 15.2086 10.5556 15.1912 10.5027 15.1843C10.4498 15.1773 10.396 15.1808 10.3445 15.1946C10.293 15.2084 10.2447 15.2323 10.2023 15.2647C10.16 15.2972 10.1245 15.3377 10.0979 15.3839L7.97272 19.0647C7.94683 19.1094 7.92532 19.1566 7.90848 19.2055L7.1689 17.9244C7.14778 17.8878 7.14778 17.8567 7.16885 17.8201Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_3_214">
          <rect width="26" height="26" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
