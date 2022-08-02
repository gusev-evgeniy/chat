class User {
  
  async create(req: Request, res: Response) {
    console.log('body', req.body)
    return 'success'
  }
}

export default new User();