import '@/styles/globals.css'
 import '@/styles/form.css'
 import '@/styles/uiprofilecard.css'
import FormPegawai from './forminputpegawai'

export default function ProfileForm() {
  return (
   
    <FormPegawai />

    )
 
}

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

// function Profile() {
//   return (
//     <img
//       src="https://i.imgur.com/MK3eW3As.jpg"
//       alt="Katherine Johnson"
//     />
//   );
// }
// 
//Writing markup with JSX
// export default function TodoList() { 
//   return (
//     <>
//       <h1>Hedy Lamarr's Todos</h1>
//       <img
//         src="https://i.imgur.com/yXOvdOSs.jpg"
//         alt="Hedy Lamarr"
//         className="photo"
//       />
//       <ul>
//         <li>Invent new traffic lights</li>
//         <li>Rehearse a movie scene</li>
//         <li>Improve spectrum technology</li>
//       </ul>
//     </>
//   );
// }

//JavaScript in JSX with curly braces
// const person = {
//   name: 'Gregorio Y. Zara',
//   theme: {
//     backgroundColor: 'black',
//     color: 'pink'
//   }
// };

// export default function TodoList() {
//   return (
//     <div style={person.theme}>
//       <h1>{person.name}'s Todos</h1>
//       <img
//         className="avatar"
//         src="https://i.imgur.com/7vQD0fPs.jpg"
//         alt="Gregorio Y. Zara"
//       />
//       <ul>
//         <li>Improve the videophone</li>
//         <li>Prepare aeronautics lectures</li>
//         <li>Work on the alcohol-fuelled engine</li>
//       </ul>
//     </div>
//   );
// }

//Passing props to a component
// import { getImageUrl } from './utils.js'

// export default function Profile() {
//   return (
//     <Card>
//       <Avatar
//         size={300}
//         person={{
//           name: 'Katsuko Saruhashi',
//           imageId: 'YfeOqp2'
//         }}
//       />
//     </Card>
//   );
// }

// function Avatar({ person, size }) {
//   return (
//     <img
//       className="avatar"
//       src={getImageUrl(person,"m")}
//       alt={person.name}
//       width={size}
//       height={size}
//     />
//   );
// }

// function Card({ children }) {
//   return (
//     <div className="card">
//       {children}
//     </div>
//   );
// }


//react form pegawai.tsx

// import { ReactDOM } from 'react';
// import FormPegawai from './forminputpegawai';
// export default function ProfileForm() {
//   return (
//     <FormPegawai />
//     )
 
// }
