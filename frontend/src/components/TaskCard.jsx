import React from 'react';
import { Card, Badge, Button, Dropdown } from 'react-bootstrap';
import { format } from 'date-fns';
import { MoreVertical, Calendar, User } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'primary';
      case 'todo': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <Card className="h-100 task-card">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <Badge bg={getPriorityColor(task.priority)} className="text-capitalize">
          {task.priority}
        </Badge>
        
        <Dropdown>
          <Dropdown.Toggle variant="link" size="sm" className="text-muted">
            <MoreVertical size={16} />
          </Dropdown.Toggle>
          
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => onEdit(task)}>
              Edit
            </Dropdown.Item>
            <Dropdown.Item 
              onClick={() => onStatusChange(task._id, 'todo')}
              disabled={task.status === 'todo'}
            >
              Mark as Todo
            </Dropdown.Item>
            <Dropdown.Item 
              onClick={() => onStatusChange(task._id, 'in-progress')}
              disabled={task.status === 'in-progress'}
            >
              Mark as In Progress
            </Dropdown.Item>
            <Dropdown.Item 
              onClick={() => onStatusChange(task._id, 'completed')}
              disabled={task.status === 'completed'}
            >
              Mark as Completed
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item 
              onClick={() => onDelete(task._id)}
              className="text-danger"
            >
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Card.Header>
      
      <Card.Body>
        <Card.Title className="h6">{task.title}</Card.Title>
        {task.description && (
          <Card.Text className="text-muted small">
            {task.description}
          </Card.Text>
        )}
        
        <div className="d-flex justify-content-between align-items-center mt-3">
          <Badge bg={getStatusColor(task.status)} className="text-capitalize">
            {task.status.replace('-', ' ')}
          </Badge>
          
          {task.dueDate && (
            <small className="text-muted d-flex align-items-center">
              <Calendar size={14} className="me-1" />
              {format(new Date(task.dueDate), 'MMM dd')}
            </small>
          )}
        </div>
        
        {task.tags && task.tags.length > 0 && (
          <div className="mt-2">
            {task.tags.map((tag, index) => (
              <Badge key={index} bg="light" text="dark" className="me-1 small">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </Card.Body>
      
      <Card.Footer className="text-muted small d-flex align-items-center">
        <User size={14} className="me-1" />
        {task.assignedTo?.name || 'Unassigned'}
      </Card.Footer>
    </Card>
  );
};

export default TaskCard;