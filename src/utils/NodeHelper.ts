import {Queue} from '../Collection/Queue';

const roleAttributeName = 'role';

export function firstElementByRole(startNode: Node, role: string): HTMLElement {
  let first = startNode.parentNode.firstChild as HTMLElement;

  while (first) {
    if (first.nodeType === Node.ELEMENT_NODE
      && first.getAttribute(roleAttributeName) === role) {
      return first;
    }

    first = first.nextSibling as HTMLElement;
  }

  return null;
}

export function lastElementByRole(startNode: Node, role: string) {
  let last = startNode.parentNode.lastChild as HTMLElement;

  while (last) {
    if (last.nodeType === Node.ELEMENT_NODE
      && last.getAttribute(roleAttributeName) === role) {
      return last;
    }

    last = last.previousSibling as HTMLElement;
  }

  return last;
}

export function nextElementByRole(startNode: Node, role: string): HTMLElement {
  let next = startNode.nextSibling as HTMLElement;

  while (next) {
    if (next.nodeType === Node.ELEMENT_NODE
      && next.getAttribute(roleAttributeName) === role) {
      return next;
    }
    next = next.nextSibling as HTMLElement;
  }

  return null;
}

export function previousElementByRole(node: Node, role: string): HTMLElement {
  let previous = node.previousSibling as HTMLElement;

  while (previous) {
    if (previous.nodeType === Node.ELEMENT_NODE
      && previous.getAttribute(roleAttributeName) === role) {
      return previous;
    }

    previous = previous.previousSibling as HTMLElement;
  }

  return null;
}

export function breadthSearch(startNode: Node, cb: (n: Node) => void) {
  const visited = new Set<Node>();
  const queue = new Queue<Node>();

  queue.push(startNode);
  while (queue.count !== 0) {
    const node = queue.pop();

    if (visited.has(node)) {
      continue;
    }

    visited.add(node);
    cb(node);
    const childNodes = Array.from(node.childNodes);

    childNodes.forEach(queue.push.bind(queue));
  }
}
