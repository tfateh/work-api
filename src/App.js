import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {useEffect,useState} from 'react'
import axios from 'axios';
import { Alert, Button, Card, CardGroup, Spinner } from 'react-bootstrap';



function App() {
  const [Data, setData] = useState();
  const [erreur,setErreur]=useState();
  const [page, setPage] = useState();
  useEffect(() => {
    const fetchData=async()=>{
      try {
        const {data}=await axios.get(`https://reqres.in/api/users?page=${page}`)
        setData(data.data)
      } catch (error) {
        setErreur(error)
      }
    }
    fetchData()
  }, [page]);
  
  console.log(Data);
  return (
    <div style={{display:'flex',flexWrap:'wrap'}}>
      {erreur && <Alert variant='danger'>
    Error 404 !!!!!
  </Alert> }

{
  Data? Data.map(el=>
    <CardGroup style={{ width: '18rem',margin:20 }}>
  <Card.Img variant="top" src={el.avatar} />
  <Card.Body>
    {/* <Card.Title>{el.first_name} {el.last_name}</Card.Title> */}
    <Card.Title>{`${el.first_name} ${el.last_name}`}</Card.Title>
    <Card.Text>
      {el.email}
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</CardGroup>
    )
    :
    !erreur && <Spinner animation="border" role="status" style={{display:'flex',margin:'auto'}}>
  <span className="visually-hidden">Loading...</span>
</Spinner>
}
<div>
  <button onClick={()=>setPage(1)}>page 1</button>
  <button onClick={()=>setPage(2)}>page 2</button>
</div>

      
    </div>
  );
}

export default App;
