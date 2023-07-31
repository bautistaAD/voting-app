import Card from 'react-bootstrap/Card';
import CardButton from './buttons/card-button';

const CandidateCard = () => {
    return (
      <Card style={{ width: '18rem' }}>
        <div className='candidate-profile rounded-circle'></div> 
        <Card.Body>
          <div className="header">
            <Card.Title>Adrianne Bautista</Card.Title>
            <Card.Text> aqbautista@up.edu.ph</Card.Text>
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