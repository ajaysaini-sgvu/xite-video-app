import React, { ReactNode } from 'react';
import { Text } from 'react-native';
interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public render() {
    if (this.state.hasError) {
      return <Text testID="error">Sorry.. there was an error</Text>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
