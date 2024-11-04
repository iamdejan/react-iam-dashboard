import { render } from "../../../test-utils/render";
import Home from "../Home";
import { describe, expect, it } from "vitest";

describe("Home", () => {
  it("should render title", () => {
    const { getByText } = render(<Home />);

    const title = getByText("You don't have to worry about Identity Access and Management...");
    expect(title).not.toBeNull();
    expect(title).toBeInstanceOf(HTMLHeadingElement);
    expect(title.style.fontWeight).toBe("bold");
  });

  it("should render subtitle", () => {
    const { getByText } = render(<Home />);

    const subTitle = getByText("Because we take care of it for you!");
    expect(subTitle).not.toBeNull();
    expect(subTitle).toBeInstanceOf(HTMLHeadingElement);
    expect(subTitle.style.fontWeight).toBe("normal");
  });

  it("should render paper items", () => {
    const { container } = render(<Home />);

    const papers = container.querySelectorAll("div.mantine-Paper-root");
    expect(papers).toHaveLength(4);
    for(let paper of papers) {
      expect(paper).toBeInstanceOf(HTMLDivElement);
      paper = paper as HTMLDivElement;

      const icon = paper.querySelector("svg");
      expect(icon).not.toBeUndefined();
      expect(icon).not.toBeNull();

      const paperTitle = paper.querySelector("h5");
      expect(paperTitle).not.toBeUndefined();
      expect(paperTitle?.textContent).not.toBeUndefined();
      expect(paperTitle?.textContent).not.toBeNull();

      const text = paper.querySelector("p");
      expect(text).not.toBeUndefined();
      expect(text?.textContent).not.toBeUndefined();
      expect(text?.textContent).not.toBeNull();
    }
  });
});
