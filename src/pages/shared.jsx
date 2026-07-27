import { Icon } from '../components/ui/Icon';

export const ArrowRight = props => <Icon name="right" {...props}/>;
export const ArrowLeft = props => <Icon name="left" {...props}/>;
export const CalendarDays = props => <Icon name="calendar" {...props}/>;
export const Minus = props => <Icon name="minus" {...props}/>;
export const Plus = props => <Icon name="plus" {...props}/>;

export function PageLink({to,go,children,light=false}) {
  return <a className={`link ${light?'light':''}`} href={to} onClick={event=>{event.preventDefault();go(to)}}>{children}<ArrowRight size={14}/></a>;
}
