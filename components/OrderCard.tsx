import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Card, Icon } from '@rneui/themed';

export type OrderCardProps = {
  order: Order;
};

const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <TouchableOpacity>
      <Card>
        <View>
          <Icon
            name="track-delivery"
            color="#eb6a7c"
            type="material-community"
          />
          <Text>{new Date(order.createdAt).toLocaleString()}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default OrderCard;
