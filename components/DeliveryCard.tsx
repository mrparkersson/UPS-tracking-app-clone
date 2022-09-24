import { View, Text } from 'react-native';
import React from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import { Card, Divider, Icon } from '@rneui/base';
import MapView, { Marker } from 'react-native-maps';

type DeliveryCardProp = {
  order: Order;
  fullWidth?: boolean;
};

const DeliveryCard = ({ order, fullWidth }: DeliveryCardProp) => {
  const tw = useTailwind();

  return (
    <Card
      containerStyle={[
        tw(`${fullWidth ? ' rounded-none m-0 ' : 'rounded-lg'} my-2 `),
        {
          backgroundColor: fullWidth ? '#eb6a7c' : '#59c1cc',
          padding: 0,
          paddingTop: 16,
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        },
      ]}
    >
      <View style={fullWidth && { height: '100%' }}>
        <Icon name="box" type="entypo" size={50} color="white" />
        <View style={tw('items-start -mt-3 p-5')}>
          <View style={tw('mx-auto')}>
            <Text
              style={tw('text-xs text-center uppercase text-white font-bold ')}
            >
              {order.carrier} - {order.trackingId}
            </Text>
            <Text style={tw('text-white text-center text-lg font-bold')}>
              Expected Delivery: {new Date(order.createdAt).toLocaleString()}
            </Text>
            <Divider color="white" />
          </View>

          <View style={tw('mx-auto  pb-5')}>
            <Text style={tw('text-base text-center text-white font-bold mt-5')}>
              Address
            </Text>
            <Text style={tw('text-sm text-center text-white')}>
              {order.Address} {order.City}
            </Text>
            <Text style={tw('text-sm  text-center text-white italic')}>
              Shipping Cost: ${order.shippingCost}
            </Text>
          </View>
        </View>

        <Divider color="white" />

        <View style={tw('p-5')}>
          {order.trackingItems.items.map((item) => {
            return (
              <View
                key={item.item_id}
                style={tw(' flex-row justify-between items-center')}
              >
                <Text style={tw('text-sm italic text-white')}>{item.name}</Text>
                <Text style={tw('text-white text-xl')}>x{item.quantity}</Text>
              </View>
            );
          })}
        </View>
        <MapView
          initialRegion={{
            latitude: order.Lat,
            longitude: order.Lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          style={[tw('w-full'), { flexGrow: 1 }, !fullWidth && { height: 200 }]}
        >
          {order.Lat && order.Lng && (
            <Marker
              coordinate={{
                latitude: order.Lat,
                longitude: order.Lng,
              }}
              title="Delivery Location"
              description={order.Address}
              identifier="destination"
            />
          )}
        </MapView>
      </View>
    </Card>
  );
};

export default DeliveryCard;
