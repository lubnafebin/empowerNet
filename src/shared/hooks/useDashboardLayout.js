import { toggleThemeService } from "../../utils";
import { useAppStateContext } from "./useAppStateContext";

export const useDashboardLayout = () => {
  const { appState, setAppState } = useAppStateContext();

  const toggleSidebar = () => {
    setAppState((draft) => {
      draft.sidebarOpen = !draft.sidebarOpen;
    });
  };

  const toggleTheme = (mode) => {
    const newMode = mode ?? (appState.theme === "light" ? "dark" : "light");
    setAppState((draft) => {
      draft.theme = newMode;
    });
    toggleThemeService({ theme: newMode, type: "set" });
  };

  const { theme, sidebarOpen } = appState;

  return {
    theme,
    sidebarOpen,
    toggleTheme,
    toggleSidebar,
  };
};
