import { Fragment } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/utils/format-currency";
import { OrderWithDetails } from "@/types/orders";

type OrderCardProps = {
  orders: OrderWithDetails[];
};

export default function OrderCard({ orders }: OrderCardProps) {
  return (
    <>
      {orders.map((order) => (
        <Card className="my-4" key={order.id}>
          <CardHeader>
            <CardTitle>Commande n° {order.id}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Crée le {order.createdAt.toLocaleDateString()} à{" "}
              {order.createdAt.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            {order.OrderDetails.map((orderDetail) => (
              <Fragment key={orderDetail.id}>
                <div className="flex gap-3">
                  <p>{orderDetail.quantity}</p>
                  <p>{orderDetail.product.name}</p>
                </div>
                <p className="text-muted-foreground">
                  statut : {orderDetail.status}
                </p>
                <p>
                  {formatCurrency(
                    orderDetail.quantity * orderDetail.product.price,
                  )}
                </p>
              </Fragment>
            ))}
          </CardContent>
          <CardFooter>
            <p>
              Total de la commande <b>{formatCurrency(order.total)}</b>
            </p>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
