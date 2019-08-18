import React from "react";
import _ from "lodash";
import { Table } from "semantic-ui-react";

function GenerateTable(props) {
  if (typeof props.trade_info.actions != "undefined") {
    return _.reverse(
      props.trade_info.actions[0].map((elem, index) => {
        console.log(elem);

        let positive = true;
        let negative = false;

        if (elem.price > elem.sold) {
          negative = true;
        }

        return (
          <Table.Row positive={positive} negative={negative} key={index}>
            <Table.Cell>{new Date(elem.time).toUTCString()}</Table.Cell>
            <Table.Cell>{_.round(elem.quantity, 6)}</Table.Cell>
            <Table.Cell>{elem.price}</Table.Cell>
            <Table.Cell>{elem.sold}</Table.Cell>
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
          <Table.HeaderCell>Time</Table.HeaderCell>
          <Table.HeaderCell>Order size</Table.HeaderCell>
          <Table.HeaderCell>Buy</Table.HeaderCell>
          <Table.HeaderCell>Sell</Table.HeaderCell>
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
