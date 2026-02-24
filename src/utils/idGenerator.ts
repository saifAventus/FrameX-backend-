import { ElementNode } from "../type/nodeType";

export function updateNodeID(
  nodes: ElementNode[],
  id: string,
  updatedData: string,
  updatedType: "className" | "text",
): ElementNode[] {
  return nodes.map((node) => {
    if (node.id === id) {
      return {
        ...node,
        props: {
          ...node.props,
          [updatedType]: updatedData,
        },
      };
    }

    if (node.children?.length) {
      return {
        ...node,
        children: updateNodeID(node.children, id, updatedData, updatedType),
      };
    }

    return node;
  });
}