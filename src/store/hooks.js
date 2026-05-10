import { useDispatch, useSelector } from 'react-redux';

// Typed hooks — use these throughout the app instead of plain useDispatch / useSelector
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
