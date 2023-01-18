import clientErrorImg from '../img/404.svg';
import serverErrorImg from '../img/503.svg';

const ErrorMessage = ({ error }) => {

  return (
    <section className='error-message-container'>
      <div className='error-message-container_inner-container'>
        <img src={+error >= 500 ? serverErrorImg : clientErrorImg} alt="Error" />
      </div>
    </section>
  )
}

export default ErrorMessage;