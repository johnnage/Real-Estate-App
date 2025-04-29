import './list.css';
import Card from "../card/Card";

function List({ posts, onMessage }) {
  return (
    <div className='list'>
      {posts.map(item => (
        <Card key={item.id} item={item} onMessage={onMessage} />
      ))}
    </div>
  );
}

export default List;