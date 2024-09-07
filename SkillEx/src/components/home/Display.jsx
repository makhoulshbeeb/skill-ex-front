import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CategoryDisplayPanel from '../common/CategoryDisplayPanel';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import UserDisplayPanel from '../common/UserDisplayPanel';



export default function Display({ displayTitle, items, type }) {
    const navigate = useNavigate();
    if (items) {
        if (items.length > 8) items = items.slice(0, 8);
        return (
            <div className="display">
                <div className='display-header'>
                    <h2>{displayTitle}</h2>
                    <FontAwesomeIcon
                        icon={faList}
                        fontSize={'1.8rem'}
                        cursor={'pointer'}
                        onClick={() => navigate(`explore/${type}`)}
                    />

                </div>
                <div className="scroll-display">
                    {items.map((item) => {
                        if (type == 'Categories') {
                            return (
                                <CategoryDisplayPanel category={item} key={item.id} />
                            )
                        }
                        if (type == 'Matches') {
                            return (
                                <UserDisplayPanel user={item} key={item.id} />
                            )
                        }
                    }

                    )}
                </div>
            </div>
        );
    }
}