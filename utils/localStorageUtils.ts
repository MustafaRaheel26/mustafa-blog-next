export const getLocalStorageItem = (key: string) => {
    return JSON.parse(localStorage.getItem(key) || 'null');
  };
  
  export const setLocalStorageItem = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  