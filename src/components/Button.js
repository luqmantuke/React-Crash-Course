import PropTypes from 'prop-types'


const Button = ({color,text,onClickFunc}) => {
 
  return  <button onClick={onClickFunc} style={{backgroundColor:color}} className='btn'>{text}</button>

}


Button.defaultProps = {
    'color': "Steelblue"
}

Button.propTypes = {
    'text': PropTypes.string.isRequired,
    'color': PropTypes.string.isRequired,
    'onClickFunc': PropTypes.func.isRequired
}
export default Button