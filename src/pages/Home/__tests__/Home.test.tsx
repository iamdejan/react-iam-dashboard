import { render } from "../../../test-utils/render";
import Home from "../Home";
import { describe, expect, test } from "vitest";

describe("Home", () => {
  test("should render title", () => {
    const { getByText } = render(<Home />);

    const title = getByText("You don't have to worry about Identity Access and Management...");
    expect(title).not.toBeNull();
    expect(title).toBeInstanceOf(HTMLHeadingElement);
    expect(title.style.fontWeight).toBe("bold");
  });

  test("should render subtitle", () => {
    const { getByText } = render(<Home />);

    const subTitle = getByText("Because we take care of it for you!");
    expect(subTitle).not.toBeNull();
    expect(subTitle).toBeInstanceOf(HTMLHeadingElement);
    expect(subTitle.style.fontWeight).toBe("normal");
  });
});