import React, { Component, ErrorInfo, ReactNode } from 'react';
import Center from './Containers/Center';
import { Button, Typography } from '@mui/material';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can log the error to an error reporting service here
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Center height="100%" gap={4}>
          <Typography variant="h1" color="error" fontWeight="bold">
            Something went wrong.
          </Typography>
          <Typography variant="h5" color="textSecondary">
            {this.state.error?.message}
          </Typography>
          <Button variant="contained" color="warning" onClick={() => (window.location.href = '/')}>
            Home
          </Button>
        </Center>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
