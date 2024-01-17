import Card from 'react-bootstrap/Card';
import CardButton from './buttons/card-button';

const DashboardCandidateCard = (prop) => {
  const name = prop.name;
    // const name = "Hotdog hotdog safljakdnf"

    return (
      <div className='dashboard-candidate-card-base shadow'>
        <div className='dashbooard-candidate-profile rounded-circle'></div> 
        <div className='dashboard-candidate-name'>{name}</div>
      </div>
    );
  }
        
  export default DashboardCandidateCard;