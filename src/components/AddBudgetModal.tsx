import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useStore } from "../stores/BudgetStore";

type Props = {
  show: boolean;
  handleClose: () => void;
};

export default function AddBudgetModal({ show, handleClose }: Props) {
  const nameRef = React.useRef<HTMLInputElement>(null);
  const maxRef = React.useRef<HTMLInputElement>(null);
  const addBudget = useStore((store) => store.addBudget);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addBudget(nameRef.current!.value, parseFloat(maxRef.current!.value));
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>New Budget</Modal.Header>
        <Modal.Body>
          <Form.Group controlId="name" className="mb-4">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={nameRef} required />
          </Form.Group>
          <Form.Group controlId="max" className="mb-4">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              type="number"
              min={0}
              step={0.01}
              ref={maxRef}
              required
            />
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
