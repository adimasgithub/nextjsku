import { useState,useEffect } from "react";
import axios from "axios";
import { stat } from "fs";

 
 const koneksiPegawai = axios.create({
  
  baseURL: "http://127.0.0.1:5000/api/pegawai" 
});

export default function FormPegawai() {
    const [statenama, setNama] = useState("");
    const [statenip, setNip] = useState("");
    const [statetanggal, setTanggal] = useState("2018-07-22");
    const [statealamat, setAlamat] = useState("");
    const [statefoto, setFoto] = useState("");
    const [pegawai, setPegawai] =  useState(null);
    const [stateadd,setAdd]=useState("hide");
    const [statebutonadd,setbtnAdd]=useState("show");
     
    const [stateedit,setEdit]=useState("hide");

     
    
    function formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
  
      return [year, month, day].join('-');
  }
   
  const handleSubmitAdd =  (event) => {
    
    event.preventDefault();
    const formData = new FormData(event.target);
    koneksiPegawai
      .post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
     
 }
 const handleSubmitEdit =  (event) => {
    
  event.preventDefault();
  const address = "/"+event.target.nip.value;
  alert(address);
  //const formData = new FormData(event.target);
  const formData = {
    nip: event.target.nip.value,
    nama: event.target.nama.value,
    alamat: event.target.alamat.value,
    tanggal_lahir: event.target.tanggal_lahir.value
}
  alert(formData);
  koneksiPegawai
    .put( address,formData)
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
   
}
  const handleAdd = (event) => {
    
     setAdd("show");
     setbtnAdd("hide");
     setEdit("hide");
 
      
  }
  const handleCancelAdd = (event) => {
    
     setAdd("hide");
     setbtnAdd("show");
     setEdit("hide");
 
      
  }
  const handleCancelEdit = (event) => {
    
    setAdd("hide");
    setbtnAdd("show");
    setEdit("hide");
    setNama("");
    setNip("");
    setAlamat("");
    setTanggal(formatDate("2018-07-22"));
    setFoto("");
     
 }
   const handleDelete = (event) => {
            event.preventDefault();
            var nip = event.target.value;
            koneksiPegawai.delete(`/${nip}`)
              .then(response => {
                console.log('Data berhasil dihapus:', response.data);
                setPegawai(
                  pegawai.filter((pegawai) => {
                     return pegawai.nip !== nip;
                  }))
             
                // Lakukan langkah-langkah lain setelah penghapusan data
              })
              .catch(error => {
                console.error('Gagal menghapus data:', error);
              })
          }

      const handleEdit = (event) => {
            event.preventDefault();
            var nip = event.target.value;
            
               const mhsEdit =  pegawai.filter((pegawai) => {
                     return pegawai.nip == nip;
                  });
                  if(mhsEdit!=null){

                    setNama(mhsEdit[0].nama);
                    setNip(mhsEdit[0].nip);
                    setAlamat(mhsEdit[0].alamat);
                    setTanggal(formatDate(mhsEdit[0].tanggal_lahir));
                    setFoto(mhsEdit[0].foto);
                    setAdd("hide");
                    setbtnAdd("show");
                    setEdit("show");

                  }
          }
  useEffect(() => {
      async function getPegawai() {
        const response = await koneksiPegawai.get("/").then(function (axiosResponse) {
            setPegawai(axiosResponse.data.data); 
     
         })
         .catch(function (error) {   
          alert('error from pegawai in api pegawai: '+error);
         });;
          }
      getPegawai();
    }, []);
  
   
if(pegawai==null){
return(
  <div>
    menunggu...
  </div>
)
}else{

  return (
    <div>
       <br/>
       <center><h1><b>Daftar Pegawai Kementerian Republik Indonesia</b></h1></center>
       <br/>
     <button id="btnadd" onClick={handleAdd} className={statebutonadd}>Tambah Data</button>
    
       <form id="formadd" className={stateadd} onSubmit={handleSubmitAdd} >
        <table border={0}>
            <tbody>
            <tr>
            <td> <label> NIP:</label></td>
            <td><input type="text" id="nip" name="nip"/>
              
              </td>
        </tr>
        <tr>
            <td>  <label> Nama:</label></td>
            <td><input type="text" id="nama"   name="nama" 
               /></td>
        </tr>
        <tr>
            <td>  <label> Foto:</label></td>
            <td>   <input
                    type="file" name="image"/>  </td>
        </tr>
        <tr>
            <td>  <label> Tanggal Lahir:</label></td>
            <td>  <input type="date" name="tanggal_lahir" className="text"
           min="1970-01-01" max="2025-12-31"/>
     </td>
        </tr>
        <tr>
            <td>  <label> Alamat:</label></td>
            <td><textarea  id="address" style={{resize: "none"}}  name="alamat" ></textarea></td>
        </tr>
            </tbody>
          </table>
          <input type="submit" />
          <input type="button" value="cancel" onClick={handleCancelAdd} />
          </form>  
      <form id="formedit" className={stateedit} onSubmit={handleSubmitEdit}>
 
          <table border={0}>
            <tbody>
            <tr>
            <td> <label> NIP:</label></td>
            <td><input type="text" id="nip"  value={statenip} name="nip"/>
              {/* onChange={handleOnchangeNip}  /> */}
              </td>
        </tr>
        <tr>
            <td>  <label> Nama:</label></td>
            <td><input type="text" id="nama"  value={statenama} name="nama"
               onChange={(e) => setNama(e.target.value)}
               /></td>
        </tr>
        <tr>
            <td>  <label> Foto:</label></td>
            <td>  <img src={statefoto} width="80"/> </td>
        </tr>
        <tr>
            <td>  <label> Tanggal Lahir:</label></td>
            <td>  <input type="date" value={statetanggal} name="tanggal_lahir"  onChange={(e) => setTanggal(e.target.value)}
           min="1970-01-01" max="2025-12-31"/>
     </td>
        </tr>
        <tr>
            <td>  <label> Alamat:</label></td>
            <td><textarea  id="address" style={{resize: "none"}} value={statealamat} name="alamat"  onChange={(e) => setAlamat(e.target.value)}></textarea></td>
        </tr>
            </tbody>
          </table>
          <input type="submit" />
          <input type="button" value="cancel" onClick={handleCancelEdit} />
          </form>  
        <br/>
        <br/>
        <table border={1}>
            <thead>
                <tr>
                  <th><b>NIP</b></th> 
                <th><b>Nama</b></th>
                <th><b>Foto</b></th>
                <th><b>Tanggal Lahir</b></th>
                <th><b>Alamat</b></th>
                <th colSpan={2}><b>Fitur</b></th>
                </tr>
            </thead>
            <tbody>
            {pegawai.map((mhs) => 
                <tr>
                    <td align="center">{mhs.nip}</td>
                    <td align="center">{mhs.nama}</td>
                    <td><img src={mhs.foto} width="200"/></td>
                    <td align="center">{formatDate(mhs.tanggal_lahir)}</td>
                    <td align="center">{mhs.alamat}</td>
                   <td><button onClick={handleEdit} value={mhs.nip}>Ubah</button></td>
                   <td><button onClick={handleDelete} value={mhs.nip}>Hapus</button></td>
                </tr>
           )}     
                   </tbody>
          </table>
         
          </div>
        )
}
  
  }
   














// import { useState } from "react";
// import axios from "axios";
// export default function FormPegawai() {
//     const [nama, setNama] = useState("");
//     const [nip, setNip] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     alert(`Nama: ${nama} \n Nip: ${nip}`)
//   }

//     return (

// <div>
//   <form onSubmit={handleSubmit}>

//       <table border={0}>
//         <tbody>
//         <tr>
//         <td> <label> nip:</label></td>
//         <td><input type="text" id="nip"  value={nip}
//           onChange={(e) => setNip(e.target.value)}  /></td>
//     </tr>
//     <tr>
//         <td>  <label> nama:</label></td>
//         <td><input type="text" id="nama"  value={nama}
//           onChange={(e) => setNama(e.target.value)} /></td>
//     </tr>
       
//     <tr>
//         <td>  <label> alamat:</label></td>
//         <td><textarea  id="address" style={{resize: "none"}} /></td>
//     </tr>
       

//     <tr>
//         <td>  <label> hobby:</label></td>
//         <td>   <select>
//             <option value="Musik">Musik</option>
//             <option value="Olahraga">Olahraga</option>
//             <option value="Membaca">Membaca</option>
//         </select></td>
//     </tr>
//     <tr>
//         <td>  <label> gender:</label></td>
//         <td>   <input
//                 type="radio" value="Pria" name="gender"/> Pria
//             <input
//                 type="radio" value="Wanita"  name="gender"/> Wanita
//             <input
//                 type="radio" value="Hermaprodit"  name="gender"/> Hermaprodit</td>
//     </tr>
//     <tr>
//         <td>  <label> Foto:</label></td>
//         <td>   <input
//                 type="file" name="foto"/>  </td>
//     </tr>
//         </tbody>
//       </table>
//       <input type="submit" />
//       <audio   src="./audio/hbd.mp3" controls autoPlay/>
     
//       </form>
//       <table border={1}>
//         <thead>
//             <tr><td>Nip</td>
//             <td>Nama</td></tr>
//         </thead>
//         <tbody>
//             <tr>
//                 <td>{nip}</td>
//                 <td>{nama}</td>
//             </tr>
//         </tbody>
//       </table>
//       </div>
//     )
//   }
   




