export const setError = (htmlElement: HTMLElement | null, textError: string): void => {
    htmlElement!.getElementsByClassName("text-error")[0].textContent = textError;
};
