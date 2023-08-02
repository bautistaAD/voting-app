import Card from 'react-bootstrap/Card';
import CardButton from './buttons/card-button';

const CandidateCard = (prop) => {
  const name = prop.name;
  const email = prop.email
    return (
      <Card style={{ width: '18rem' }}>
        <div className='candidate-profile rounded-circle'></div> 
        <Card.Body>
          <div className="header">
            <Card.Title>{name}</Card.Title>
            <Card.Text>{email}</Card.Text>
          </div>
          <div className="buttons d-flex justify-content-evenly">
            <CardButton name="EDIT"/>
            <CardButton name="VIEW"/>
            <CardButton name="DELETE"/>
          </div>
        </Card.Body>
      </Card>
    );
  }
  
  export default CandidateCard;