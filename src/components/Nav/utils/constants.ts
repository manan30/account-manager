import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { MdRepeatOne } from 'react-icons/md';
import { GiTakeMyMoney } from 'react-icons/gi';
import { CgProfile } from 'react-icons/cg';

export const links = [
  { to: '/expenses', linkText: 'Expenses', component: FaRegMoneyBillAlt },
  { to: '/creditors', linkText: 'Creditors', component: GiTakeMyMoney },
  { to: '/recurring', linkText: 'Recurring', component: MdRepeatOne },
  { to: '/profile', linkText: 'Profile', component: CgProfile }
];
