import React from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { tasksAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, Clock, AlertCircle, Plus } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  
  const { data: stats, isLoading: statsLoading } = useQuery(
    'taskStats',
    tasksAPI.getTaskStats,
    {
      select: (response) => response.data
    }
  );

  const { data: recentTasks, isLoading: tasksLoading } = useQuery(
    'recentTasks',
    () => tasksAPI.getTasks({ limit: 5 }),
    {
      select: (response) => response.data.tasks
    }
  );

  const StatCard = ({ title, count, icon: Icon, color, bgColor }) => (
    <Card className="h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="text-muted mb-2">{title}</h6>
            <h3 className="mb-0">{count}</h3>
          </div>
          <div className={`p-3 rounded-circle ${bgColor}`}>
            <Icon size={24} className={color} />
          </div>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h2>Welcome back, {user?.name}!</h2>
          <p className="text-muted">Here's an overview of your tasks</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <StatCard
            title="Total Tasks"
            count={statsLoading ? '...' : (stats?.todo || 0) + (stats?.['in-progress'] || 0) + (stats?.completed || 0)}
            icon={Plus}
            color="text-primary"
            bgColor="bg-primary bg-opacity-10"
          />
        </Col>
        <Col md={4}>
          <StatCard
            title="In Progress"
            count={statsLoading ? '...' : stats?.['in-progress'] || 0}
            icon={Clock}
            color="text-warning"
            bgColor="bg-warning bg-opacity-10"
          />
        </Col>
        <Col md={4}>
          <StatCard
            title="Completed"
            count={statsLoading ? '...' : stats?.completed || 0}
            icon={CheckCircle}
            color="text-success"
            bgColor="bg-success bg-opacity-10"
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Recent Tasks</h5>
            </Card.Header>
            <Card.Body>
              {tasksLoading ? (
                <div className="text-center py-4">
                  <Spinner animation="border" />
                </div>
              ) : recentTasks && recentTasks.length > 0 ? (
                <div>
                  {recentTasks.map((task) => (
                    <div key={task._id} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                      <div>
                        <h6 className="mb-1">{task.title}</h6>
                        <small className="text-muted">{task.description || 'No description'}</small>
                      </div>
                      <div className="text-end">
                        <span className={`badge ${
                          task.status === 'completed' ? 'bg-success' :
                          task.status === 'in-progress' ? 'bg-primary' : 'bg-secondary'
                        }`}>
                          {task.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-muted">
                  <AlertCircle size={48} className="mb-3" />
                  <p>No tasks yet. Create your first task!</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;