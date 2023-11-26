/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import axiosInstance from "./service/Api"

const App = () => {
  const [dataProduct, setDataProduct]: any = useState([])
  const [formDataProduct, setFormDataProduct] = useState({
    namaProduk: '',
    harga: 0,
    kategori: 0,
    status: 0
  })
  const [productId, setProductId] = useState(0)
  const [errorMessage, setErrorMessage]: any = useState()


  useEffect(() => {
    axiosInstance.get('/product/')
      .then((response) => {
        setDataProduct(response.data)
      })
      .catch((error: any) => {
        if (error.response) {
          alert('Error ' + error.response.message)
        }
      })
  }, [])


  const addProduct = () => {
    axiosInstance.post('/product/', {
      nama_produk: formDataProduct.namaProduk,
      harga: formDataProduct.harga,
      kategori: formDataProduct.kategori,
      status: formDataProduct.status
    })
      .then((response) => {
        setDataProduct([...dataProduct, response.data])
        setFormDataProduct({
          namaProduk: '',
          harga: 0,
          kategori: 0,
          status: 0
        })
        setErrorMessage('')
      })
      .catch((error: any) => {
        alert('Gagal mengirim data')
        setErrorMessage(error.response.data)
      })
  }

  const getIdProduct = (id: number) => {
    setProductId(id)
    axiosInstance.get(`/product/${id}`)
      .then((response) => {
        setFormDataProduct({
          namaProduk: response.data.nama_produk,
          harga: response.data.harga,
          kategori: response.data.kategori,
          status: response.data.status
        })
      })
      .catch((error: any) => {
        if (error.response) {
          alert('Error ' + error.response.message)
        }
      })
  }

  const updateProduct = () => {
    axiosInstance.put(`/product/${productId}`, {
      nama_produk: formDataProduct.namaProduk,
      harga: formDataProduct.harga,
      kategori: formDataProduct.kategori,
      status: formDataProduct.status
    })
      .then(() => {
        const updatedDataProduct = dataProduct.map((item: any) =>
          item.id === productId
            ? {
              ...item,
              nama_produk: formDataProduct.namaProduk,
              harga: formDataProduct.harga,
              kategori: formDataProduct.kategori,
              status: formDataProduct.status
            }
            : item
        );
        setDataProduct(updatedDataProduct);
        setFormDataProduct({
          namaProduk: '',
          harga: 0,
          kategori: 0,
          status: 0
        })
        setErrorMessage('')
      })
      .catch((error: any) => {
        alert('Gagal mengirim data')
        setErrorMessage(error.response.data)
      })
  }

  const deleteProduct = () => {
    axiosInstance.delete(`/product/${productId}`)
      .then(() => {
        const updatedDataProduct = dataProduct.filter((item: any) => item.id !== productId);
        setDataProduct(updatedDataProduct);
        setFormDataProduct({
          namaProduk: '',
          harga: 0,
          kategori: 0,
          status: 0
        })
      })
      .catch((error: any) => {
        if (error.response) {
          alert('Error ' + error.response.data)
        }
      })
  }

  const checkKategoriFormat = (id: number): string => {
    let kategoriString: string = '';
    switch (id) {
      case 1:
        kategoriString = 'L QUEENLY';
        break;

      case 2:
        kategoriString = 'L MTH AKSESORIS (IM)';
        break;

      case 3:
        kategoriString = 'L MTH TABUNG (LK)';
        break;

      case 4:
        kategoriString = 'SP MTH SPAREPART (LK)';
        break;

      case 5:
        kategoriString = 'CI MTH TINTA LAIN (IM)';
        break;

      case 6:
        kategoriString = 'S MTH STEMPEL (IM)';
        break;

      default:
        break;
    }

    return kategoriString;
  }

  return (
    <>
      <section>
        <div className="header text-center mt-4">
          <h4>Tes Junior Programmer</h4>
        </div>
        <div className="body p-4" >
          <div className="card" style={{ height: "10%" }}>
            <div className="card-header">
              <div className="d-flex justify-content-between align-items-center p-2">
                <span style={{ fontWeight: "bold" }}>Data Produk</span>
                <button type="button" className="btn btn-primary" data-bs-toggle='modal' data-bs-target="#modalAdd" >Tambah</button>
              </div>
            </div>
            <div className="tabel" style={{ height: "420px", overflowY: "scroll" }}>
              <table className="table table-bordered">
                <thead className="thead-dark sticky-top" style={{ backgroundColor: "GrayText", color: "white", width: "100%" }}>
                  <tr>
                    <th scope="col" style={{ textAlign: "center" }}>No</th>
                    <th scope="col" style={{ width: "40%" }}>Nama Produk</th>
                    <th scope="col" style={{ textAlign: "center" }}>Harga</th>
                    <th scope="col" style={{ textAlign: "center" }}>Kategori</th>
                    <th scope="col" style={{ textAlign: "center" }}>Status</th>
                    <th scope="col" className="text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    dataProduct.map((val: any, index: number) => (
                      <tr key={index}>
                        <th scope="row" style={{ textAlign: "center" }}>{index + 1}</th>
                        <td>{val.nama_produk}</td>
                        <td style={{ textAlign: "center" }}>Rp. {val.harga}</td>
                        <td style={{ textAlign: "center" }}>{checkKategoriFormat(val.kategori)}</td>
                        <td style={{ textAlign: "center" }}>{val.status == 1 ? "Bisa dijual" : "Tidak bisa dijual"}</td>
                        <td className="d-flex align-items-center justify-content-center gap-4">
                          <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalUpdate" onClick={() => getIdProduct(val.id)}><i className="fa fa-solid fa-pen-to-square"></i></button>
                          <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modalDelete" onClick={() => getIdProduct(val.id)}><i className="fa fa-solid fa-trash"></i></button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <div className="component-modal">
        <div className="modal fade" id="modalAdd" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Tambah Produk</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form action="">
                  <div className="form-group my-2">
                    <label htmlFor="exampleInputText">Nama Produk</label>
                    <input
                      value={formDataProduct.namaProduk}
                      onChange={(e) => setFormDataProduct({ ...formDataProduct, namaProduk: e.target.value })}
                      type="text" className="form-control" id="exampleInputText" />
                    {
                      errorMessage && (
                        <span style={{ color: 'red', fontSize: "10px" }}>{errorMessage.nama_produk !== undefined ? `* ${errorMessage?.nama_produk}` : ""}</span>
                      )
                    }
                  </div>
                  <div className="form-group my-3">
                    <label htmlFor="exampleInputNumber">Harga</label>
                    <input
                      value={formDataProduct.harga}
                      onChange={(e) => setFormDataProduct({ ...formDataProduct, harga: parseInt(e.target.value) })}
                      type="number" className="form-control" id="exampleInputText" />
                    {
                      errorMessage && (
                        <span style={{ color: 'red', fontSize: "10px" }}>{errorMessage.harga !== undefined ? `* ${errorMessage?.harga}` : ""}</span>
                      )
                    }
                  </div>
                  <div className="form-group my-3">
                    <label htmlFor="exampleFormControlSelect1">Kategori</label>
                    <select
                      value={formDataProduct.kategori}
                      onChange={(e) => setFormDataProduct({ ...formDataProduct, kategori: parseInt(e.target.value) })}
                      className="form-control" id="exampleFormControlSelect1">
                      <option>--Pilih--</option>
                      <option value={1}>L QUEENLY</option>
                      <option value={2}>L MTH AKSESORIS (IM)</option>
                      <option value={3}>L MTH TABUNG (LK)</option>
                      <option value={4}>SP MTH SPAREPART (LK)</option>
                      <option value={5}>CI MTH TINTA LAIN (IM)</option>
                      <option value={6}>S MTH STEMPEL (IM)</option>
                    </select>
                    {
                      errorMessage && (
                        <span style={{ color: 'red', fontSize: "10px" }}>{errorMessage.kategori !== undefined ? `* ${errorMessage?.kategori}` : ""}</span>
                      )
                    }
                  </div>
                  <div className="form-group my-3">
                    <label htmlFor="exampleFormControlSelect1">Status</label>
                    <select
                      value={formDataProduct.status}
                      onChange={(e) => setFormDataProduct({ ...formDataProduct, status: parseInt(e.target.value) })}
                      className="form-control" id="exampleFormControlSelect1">
                      <option>--Pilih--</option>
                      <option value={1}>Bisa dijual</option>
                      <option value={2}>Tidak bisa dijual</option>
                    </select>
                    {
                      errorMessage && (
                        <span style={{ color: 'red', fontSize: "10px" }}>{errorMessage.status !== undefined ? `* ${errorMessage?.status}`: ""}</span>
                      )
                    }
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => addProduct()}>Tambahkan</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="modalUpdate" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Produk</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form action="">
                  <div className="form-group my-2">
                    <label htmlFor="exampleInputText">Nama Produk</label>
                    <input
                      value={formDataProduct.namaProduk}
                      onChange={(e) => setFormDataProduct({ ...formDataProduct, namaProduk: e.target.value })}
                      type="text" className="form-control" id="exampleInputText" />
                  </div>
                  <div className="form-group my-3">
                    <label htmlFor="exampleInputNumber">Harga</label>
                    <input
                      value={formDataProduct.harga}
                      onChange={(e) => setFormDataProduct({ ...formDataProduct, harga: parseInt(e.target.value) })}
                      type="number" className="form-control" id="exampleInputText" />
                  </div>
                  <div className="form-group my-3">
                    <label htmlFor="exampleFormControlSelect1">Kategori</label>
                    <select
                      value={formDataProduct.kategori}
                      onChange={(e) => setFormDataProduct({ ...formDataProduct, kategori: parseInt(e.target.value) })}
                      className="form-control" id="exampleFormControlSelect1">
                      <option>--Pilih--</option>
                      <option value={1}>L QUEENLY</option>
                      <option value={2}>L MTH AKSESORIS (IM)</option>
                      <option value={3}>L MTH TABUNG (LK)</option>
                      <option value={4}>SP MTH SPAREPART (LK)</option>
                      <option value={5}>CI MTH TINTA LAIN (IM)</option>
                      <option value={6}>S MTH STEMPEL (IM)</option>
                    </select>
                  </div>
                  <div className="form-group my-3">
                    <label htmlFor="exampleFormControlSelect1">Status</label>
                    <select
                      value={formDataProduct.status}
                      onChange={(e) => setFormDataProduct({ ...formDataProduct, status: parseInt(e.target.value) })}
                      className="form-control" id="exampleFormControlSelect1">
                      <option>--Pilih--</option>
                      <option value={1}>Bisa dijual</option>
                      <option value={2}>Tidak bisa dijual</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => updateProduct()}>Perbarui</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="modalDelete" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Hapus Produk</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <span>Apakah anda yakin ingin menghapus ?</span>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => deleteProduct()}>Hapus</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App