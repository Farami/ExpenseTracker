import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { UNCATEGORIZED_ID, useStore } from "../stores/BudgetStore";

type Props = {
  budgetId: string | null;
  handleClose: () => void;
};

export default function AddExpenseModal({ budgetId, handleClose }: Props) {
  const descriptionRef = React.useRef<HTMLInputElement>(null);
  const amountRef = React.useRef<HTMLInputElement>(null);
  const budgetIdRef = React.useRef<HTMLSelectElement>(null);

  const addExpense = useStore((store) => store.addExpense);
  const budgets = useStore((store) => store.budgets);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addExpense(
      budgetIdRef.current!.value,
      descriptionRef.current!.value,
      parseFloat(amountRef.current!.value)
    );
    handleClose();
  }

  return (
    <Modal show={budgetId !== null} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>New Budget</Modal.Header>
        <Modal.Body>
          <Form.Group controlId="name" className="mb-4">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" ref={descriptionRef} required />
          </Form.Group>
          <Form.Group controlId="amount" className="mb-4">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              min={0}
              step={0.01}
              ref={amountRef}
              required
            />
          </Form.Group>
          <Form.Group controlId="budgetId" className="mb-4">
            <Form.Label>Budget</Form.Label>
            <Form.Select ref={budgetIdRef}>
              <option key={UNCATEGORIZED_ID} value={UNCATEGORIZED_ID}>
                Uncategorized
              </option>
              {budgets.map(({ id, name }) => (
                <option key={id} value={id} selected={budgetId === id}>
                  {name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button type="submit" variant="primary">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
