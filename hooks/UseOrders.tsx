import { Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ORDERS } from '../graphql/queries';

const UseOrders = () => {
  const { data, loading, error } = useQuery(GET_ORDERS);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect((): any => {
    if (!data) return;

    const orders: Order[] = data.getOrders.map(({ value }: OrderResponse) => ({
      Address: value.Address,
      trackingId: value.trackingId,
      shippingCost: value.shippingCost,
      createdAt: value.createdAt,
      carrier: value.carrier,
      Lng: value.Lng,
      Lat: value.Lat,
      City: value.City,
      trackingItems: value.trackingItems,
    }));

    setOrders(orders);
  }, [data]);

  return { loading, error, orders };
};

export default UseOrders;
