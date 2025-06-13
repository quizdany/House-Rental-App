import React, { useState } from 'react';
import { postReview } from '../api';

export default function ReviewForm({ houseId }) {
  const [review, setReview] = useState({ reviewer: '', rating: '', comment: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    postReview({ ...review, houseId }).then(() => alert('Review submitted!'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Your Name" onChange={e => setReview({ ...review, reviewer: e.target.value })} />
      <input placeholder="Rating (1-5)" onChange={e => setReview({ ...review, rating: e.target.value })} />
      <textarea placeholder="Comment" onChange={e => setReview({ ...review, comment: e.target.value })} />
      <button type="submit">Submit Review</button>
    </form>
  );
}
