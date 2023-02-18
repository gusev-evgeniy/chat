import User from '../entities/user';

export const getOtherUsersByNameAndCount = async (name: string, me: string) => {
  try {
    const [users, count] = await User.createQueryBuilder('user')
      .where('user.name like :name', { name: `%${name}%` })
      .andWhere('user.id != :id', { id: me })
      .take(50)
      .getManyAndCount();

    return { users, count };
  } catch (error) {}
};

export const updateUser = async (id: string, update: Partial<User>) => {
  try {
    await User.createQueryBuilder('user').update(update).where({ id }).execute();
  } catch (error) {}
};
