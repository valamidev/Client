import React from "react";
import _ from "lodash";
import { Table } from "semantic-ui-react";

function GenerateTable(props) {
  if (typeof props.trade_info.historyOrders != "undefined") {
    return _.reverse(
      props.trade_info.historyOrders.map((elem, index) => {
        let positive = true;
        let negative = false;

        if (elem.price > elem.sold) {
          negative = true;
        }

        if (elem.price < elem.sold && elem.close_type !== "Sell") {
          elem.close_type = "Trailing stop";
        }

        return (
          <Table.Row positive={positive} negative={negative} key={index}>
            <Table.Cell>
              {new Date(elem.time).toUTCString()} /{" "}
              {new Date(elem.closed).toUTCString()}
            </Table.Cell>
            <Table.Cell>{_.round(elem.quantity, 6)}</Table.Cell>
            <Table.Cell>{elem.price}</Table.Cell>
            <Table.Cell>{elem.sold}</Table.Cell>
            <Table.Cell>{elem.close_type}</Table.Cell>
            <Table.Cell>{elem.balance}</Table.Cell>
          </Table.Row>
        );
      })
    );
  }
  return (
    <Table.Row>
      <Table.Cell />
    </Table.Row>
  );
}

function Tradelog(props) {
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Time (Open/Close)</Table.HeaderCell>
          <Table.HeaderCell>Order size</Table.HeaderCell>
          <Table.HeaderCell>Buy Price</Table.HeaderCell>
          <Table.HeaderCell>Sell Price</Table.HeaderCell>
          <Table.HeaderCell>Action</Table.HeaderCell>
          <Table.HeaderCell>Balance</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <GenerateTable trade_info={props.trade_data} />
      </Table.Body>
    </Table>
  );
}

export default Tradelog;
