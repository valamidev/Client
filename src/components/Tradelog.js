import React from "react";
import _ from "lodash";
import { Table } from "semantic-ui-react";

function GenerateTable(props) {
  if (typeof props.trade_info.actions != "undefined") {
    return _.reverse(
      props.trade_info.actions[0].map((elem, index) => {
        if (elem.action === "BUY") {
          return (
            <Table.Row positive key={index}>
              <Table.Cell>{elem.action}</Table.Cell>
              <Table.Cell>{new Date(elem.time).toUTCString()}</Table.Cell>
              <Table.Cell>{elem.price}</Table.Cell>
              <Table.Cell>{elem.quote_balance}</Table.Cell>
            </Table.Row>
          );
        } else {
          return (
            <Table.Row negative key={index}>
              <Table.Cell>{elem.action}</Table.Cell>
              <Table.Cell>{new Date(elem.time).toUTCString()}</Table.Cell>
              <Table.Cell>{elem.price}</Table.Cell>
              <Table.Cell>{elem.quote_balance}</Table.Cell>
            </Table.Row>
          );
        }
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
          <Table.HeaderCell>Action</Table.HeaderCell>
          <Table.HeaderCell>Time</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
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
