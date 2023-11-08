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
import ButtonDelete from "@/components/button-delete";

type OrderCardProps = {
  orders: OrderWithDetails[];
  isAdmin?: boolean;
};

export default function OrderCard({ orders, isAdmin }: OrderCardProps) {
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
          <CardFooter className="flex flex-col items-start">
            <p>
              Total de la commande <b>{formatCurrency(order.total)}</b>
            </p>
            {isAdmin && (
              <>
                <p>
                  Utilisateur : <b>{order.user.email}</b>
                </p>
                <ButtonDelete id={order.id} />
              </>
            )}
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
