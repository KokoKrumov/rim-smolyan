import { useDispatch, useSelector } from 'react-redux';

// App hooks — use these throughout the app instead of plain useDispatch / useSelector
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
