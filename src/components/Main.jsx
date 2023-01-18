import { useState, useEffect } from "react"

import Pagination from 'react-bootstrap/Pagination';
import { Spinner } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import ColorCardsList from "./ColorCardsList";
import ErrorMessage from "./ErrorMessage";

const Main = () => {
  const [colors, setColors] = useState([]);
  const [id, setId] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let items = [];

  for (let number = 1; number <= pages; number++) {
    items.push(
      <Pagination.Item 
        className={'paginationItemStyle .active>.page-link, .page-link.active'} 
        key={number} active={number === activePage} 
        onClick={() => {setActivePage(number)}}>
        {number}
      </Pagination.Item>,
    );
  }

  useEffect(() => {
    const idQuery = id ? `&id=${id}` : '';
    fetch(`https://reqres.in/api/products?per_page=5&page=${activePage}${idQuery}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json()
    })
      .then(body => {
        setPages(body.total_pages);
        setColors(body.data);
        setError(null);
      })
      .then(setLoading(false))
      .catch(error => setError(error.message))
  }, [activePage, id]);

  const handleChange = (e) => {
    setId(e.target.value)
  }

  const handleMapColors = (colors) => {
    if (id) {
      const { id, name, year, color, pantone_value } = colors;
      return (
        <ColorCardsList  key={id} 
        style={{ background: color }}
        code_color={color}
        code={pantone_value}
        color_name={name}
        color_year={year}
        color_id={id}/>
      )
    } else if (colors.length > 0) {
      const array = colors.map(({ id, name, year, color, pantone_value }) => (
        <ColorCardsList key={id} style={{ background: color }}
        code={pantone_value}
        code_color={color}
        color_name={name}
        color_year={year}
        color_id={id}/>  
      ))
      return array
    }
  }

  const elements = handleMapColors(colors);
  const spinner = loading ?  <div className="spinner"><Spinner animation="border"  /></div> : null;
  const errorMessage = error === '404' ? <ErrorMessage error={error} /> : null;

  let paginationWithFiltredCard = {'display': 'block'}
  if (items.length === 0) {
    paginationWithFiltredCard = {'display': 'none'}
  };

  let changeGridContainer = {'gridTemplateColumns': 'repeat(9, 1fr)'} 
  if (items.length === 0) {
    changeGridContainer = {'gridTemplateColumns' : '1fr'}
  }

  return (
    <>
     <InputGroup className="mb-3">
        <Form.Control
          placeholder="Filter colors by id"
          name='filter'
          type='number'
          value={id}
          onChange={handleChange}
        />
      </InputGroup>
      <div>
        {errorMessage}
        {spinner}
        <section className={`${error !== null ? 'hide-grid' : 'grid_container'}`} style={changeGridContainer}>
          {elements}
        </section>
      </div>
      <div className={`${error !== null ? 'hide-pagination' : 'show-pagination'}`} style={paginationWithFiltredCard}> 
        <Pagination className="justify-content-center mb-0"  >
          <Pagination.Prev onClick={()=> {if (activePage > 1) {(setActivePage(activePage - 1))}}}/>
            {items}
          <Pagination.Next onClick={()=> {if (activePage < pages) {(setActivePage(activePage + 1))}}}/>
        </Pagination>
      </div>
    </>
  )
}

export default Main;