
export default function urlManager (user, id, view, extra) {

   if (user && user === 'watcher') user = 'guard'; 

   if (view) view = rightUrl(user, view);
   if (view === undefined) return `/${user}/${id}`;
   if (extra) {
      return `/${user}/${id}/${view}/${extra}`;
   } else if (view) {
      return `/${user}/${id}/${view}`;
   }  else return `/${user}/${id}`;
}

function rightUrl (user, view) {
   switch (view) {
      case 'profile':
         return view;
      case 'reports':
         return view;
      case 'employees':
         if (user === 'boss' || user === 'supervisor') {
            return view;
         }
         break;
      case 'add':
         if (user === 'boss' || user === 'supervisor') {
            return view;
         }
         break;
      case 'createTask':
         if (user === 'boss' || user === 'supervisor') {
            return view;
         }
         break;
      case 'seeTasks':
         if (user === 'boss' || user === 'supervisor') {
            return view;
         }
         break;
      case 'environment':
         if (user === 'boss' || user === 'supervisor') {
            return view;
         }
         break;
      case 'tasks':
         if (user === 'watcher' || user === 'supervisor') {
            return view;
         }
         break;
      default:
      return undefined;
   }
   return undefined;
}