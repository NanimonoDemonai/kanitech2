import { atomFamily, selectorFamily } from "recoil";
import { getFrontendContainer } from "src/di/frontendContainer";
import { EntryUseCases } from "src/useCases/EntryUseCases";

const sourceFetch = selectorFamily<string, string>({
  key: "sourceFetch", // unique ID (with respect to other atoms/selectors)
  get: (pid) => async () => {
    const container = getFrontendContainer();
    const useCase = container.resolve(EntryUseCases);
    const entry = await useCase.find(pid);
    return entry?.source || "";
  },
});

export const sourceAtom = atomFamily<string, string>({
  key: "source",
  default: (pid) => sourceFetch(pid),
});
