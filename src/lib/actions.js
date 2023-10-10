export function longpress(node, threshold = 250) {
    // note — a complete answer would also consider touch events
  
    const handle_mousedown = () => {
      let start = Date.now();
  
      const timeout = setTimeout(() => {
        node.dispatchEvent(new CustomEvent('longpress'));
      }, threshold);
  
      const cancel = () => {
        clearTimeout(timeout);
        node.removeEventListener('mousemove', cancel);
        node.removeEventListener('mouseup', cancel);
      };
  
      node.addEventListener('mousemove', cancel);
      node.addEventListener('mouseup', cancel);
    }
  
    node.addEventListener('mousedown', handle_mousedown);
  
    return {
      destroy() {
        node.removeEventListener('mousedown', handle_mousedown);
      }
    };
  }