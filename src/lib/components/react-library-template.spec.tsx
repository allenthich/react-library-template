import { render } from "@testing-library/react";

import ReactLibraryTemplate from "./react-library-template";

describe("ReactLibraryTemplate", () => {
	it("should render successfully", () => {
		const { baseElement } = render(<ReactLibraryTemplate />);
		expect(baseElement).toBeTruthy();
	});
});
