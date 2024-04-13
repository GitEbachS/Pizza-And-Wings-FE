import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleOrder } from '../../../controllers/orderApi';
import CloseForm from '../../../components/CloseForm';

export default function EditRecipe() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleOrder(id).then(setEditItem);
  }, [id]);

  return (<CloseForm orderObj={editItem} />);
}
