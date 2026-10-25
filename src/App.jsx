import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

// function clicked() {
//   alert('Button  2  clicked!👍🙌')
// }

function QuantityCounter(product) {
  const [quantity, setQuantity] = useState(0);
  const [add, setAdd] = useState(true);
  product = product.product.product;
  return (<>
    <h3>{product.name}</h3>
    <h4>מחיר: {product.price} ש"ח</h4>
    <button onClick={() => setQuantity(quantity + 1)}>+</button>
    <button onClick={() => setQuantity(quantity > 0 ? quantity - 1 : 0)}>-</button>
    <h3>סה"כ: {quantity} מחיר: {quantity * product.price} ש"ח</h3>
    <ProductDescription product={product}></ProductDescription>
    {add ? (quantity > 0 ? <button class='add' onClick={() => setAdd(false)}>הוסף לסל</button> : null) : <p> נוסף לעגלה: {quantity} יחידות</p>}
  </>);
}


function ProductDescription(product) {

  const [seem, setSeem] = useState(false);
  product = product.product;

  return (
    <>
      <h5>{product.description}</h5>

      <button onClick={() => setSeem(!seem)}>קרא עוד</button>

      {seem && (
        <ul>
          {product.feature.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      )}

    </>
  );
}

function ContactForm() {
  const [textarea, setTextarea] = useState({ value: '' });
  const [sent, setSent] = useState(false);
  return (
    <>
      {
        sent ? <p>ההודעה נשלחה בהצלחה!</p> :
          <form>
            <textarea placeholder="Message" onChange={(e) => setTextarea({ value: e.target.value })} maxLength="100"></textarea>
            <h4>נשארו {100 - textarea.value.length} תווים</h4>
            {textarea.value.length > 0 && <button onClick={() => setSent(true)} type="submit">Send</button>}
          </form>
      }
    </>);
}

function FavoriteButton(name) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <button onClick={() => setIsFavorite(!isFavorite)}>
      {isFavorite ? '❤️' : '🤍'} {name.value}
    </button>
  );
}

function ProductCard(product) {
  return (
    <article className="product-card">
      <FavoriteButton name={product.product.name} />
      <QuantityCounter product={product} />

    </article>
  );
}



const initialProducts  = [
  {
    "id": 1,
    "name": 'סט כוסות',
    "price": 25,
    "description": 'סט של שישה כוסות זכוכית עמידות, מושלם לשימוש יומיומי או לאירוח. הכוסות עשויות מזכוכית איכותית ומגיעות בעיצוב מודרני ואלגנטי. הן קלות לניקוי ועמידות בפני חום וקור, מה שהופך אותן לבחירה אידיאלית לכל בית.',
    "feature": ['עומס', 'קל לניקוי']
  },
  {
    "id": 2,
    "name": 'סט צלחות',
    "price": 50,
    "description": 'סט של ארבע צלחות קרמיקה איכותיות, מושלם לארוחות יומיומיות או לאירוח. הצלחות מגיעות בעיצוב מודרני ועמידות בפני חום וקור.',
    "feature": ['עמידות', 'קל לניקוי', 'עמידות בפני חום וקור', 'עיצוב מודרני', 'עמידות בפני שריטות', 'עמידות בפני כתמים', 'עמידות בפני חלודה', 'עמידות בפני חומצות', 'עמידות בפני שברים', 'עמידות בפני טמפרטורות גבוהות']
  },
  {
    "id": 3,
    "name": 'סט סכו"ם',
    "price": 30,
    "description": 'סט של עשרה חלקי סכו"ם מנירוסטה איכותית, מושלם לשימוש יומיומי או לאירוח. הסכו"ם מגיע בעיצוב מודרני  ',
    "feature": ['עומס', 'קל לניקוי', 'עמידות בפני חום וקור', 'עמידות בפני שריטות', 'עמידות בפני כתמים', 'עמידות בפני חלודה', 'עמידות בפני חומצות', 'עמידות בפני שברים', 'עמידות בפני טמפרטורות גבוהות']
  },
  {
    "id": 4,
    "name": 'סט סירים',
    "price": 100,
    "description": 'סט של חמישה סירים מנירוסטה איכותית, מושלם לשימוש יומיומי או לאירוח. הסירים מגיעים בעיצוב מודרני ועמידים בפני חום וקור.',
    "feature": ['עומס', 'קל לניקוי', 'עמידות בפני חום וקור', 'עמידות בפני שריטות', 'עמידות בפני כתמים', 'עמידות בפני חלודה', 'עמידות בפני חומצות', 'עמידות בפני שברים', 'עמידות בפני טמפרטורות גבוהות']
  }
];

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    feature: ''
  });
  const [lightMode, setLightMode] = useState(true);
  return (<>
    <div className={lightMode ? 'lightMode' : 'darkMode'}>
      <button onClick={() => setLightMode(!lightMode)}>
        {lightMode ? '🌑' : '☀️'}
      </button>


      <button onClick={() => setFormOpen(!formOpen)}>
        {formOpen ? 'סגור טופס' : 'הוסף מוצר חדש'}
      </button>
      {formOpen && (
        <form className="add-product-form">
          <h3 className="form-title">הוספת מוצר חדש</h3>
          <input type="text" placeholder="שם המוצר" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <input type="number" placeholder="מחיר (ש״ח)" min="0" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
          <input type="text" placeholder="תיאור" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          <input type="text" placeholder="מאפיינים (מופרדים בפסיקים)" value={formData.feature} onChange={(e) => setFormData({ ...formData, feature: e.target.value })} />
          <button className="submit-btn" type="submit" onClick={(e) => {
            e.preventDefault();
            const newProduct = {
              id: products.length + 1,
              name: formData.name,
              price: parseFloat(formData.price),
              description: formData.description,
              feature: formData.feature.split(',').map(f => f.trim())
            }

            setProducts([...products, newProduct]);
            setFormData({
              name: '',
              price: '',
              description: '',
              feature: ''
            });
            setFormOpen(!formOpen)
          }}> הוסף מוצר</button>
        </form >)}


      {products.map(product => (
        <ProductCard product={product} key={product.id} />
      ))}
      <ContactForm></ContactForm>
    </div></>);
}

export default App
