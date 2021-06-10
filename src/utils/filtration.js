const onFilterItem = (items, filter) => {
  switch(filter){
    case 'all':
      return items;
    case 'active':
      return items.filter(item => !item.completed);
    case 'completed':
      return items.filter(item => item.completed);
    default:
      return items;
  }
}

export default onFilterItem;