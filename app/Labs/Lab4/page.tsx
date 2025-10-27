"use client";
import React from "react";
import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import EventObject from "./EventObject";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import ReduxExamples from "./ReduxExamples/page";
import { Provider } from "react-redux";
import store from "./store";
import HelloRedux from "./ReduxExamples/HelloRedux/page";
import CounterRedux from "./ReduxExamples/CounterRedux/page";
import AddRedux from "./ReduxExamples/AddRedux/page";
import TodoList from "./ReduxExamples/todos/TodoList";

export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }

  return (
    <Provider store={store}>
      <div id="wd-lab4">
        <h1>Lab 4</h1>
        <ClickEvent />
        <PassingDataOnEvent />
        <PassingFunctions theFunction={() => alert("Hello World!")} />
        <EventObject />
        <Counter />
        <BooleanStateVariables />
        <StringStateVariables />
        <DateStateVariable />
        <ObjectStateVariable />
        <ArrayStateVariable />
        <ParentStateComponent />
        <ReduxExamples />
        <HelloRedux />
        <CounterRedux />
        <AddRedux />
        <TodoList />
      </div>
    </Provider>
  );
}
