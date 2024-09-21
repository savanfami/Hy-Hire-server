import { Request, Response, NextFunction } from 'express'
import { IDependencies } from 'application/interfaces/IDependencies'
import companySocialLinksUpdateConsumer from '../../infrastructure/kafka/producer/companySocialLinksUpdateConsumer'

export const updateSocialLinksController = (dependencies: IDependencies) => {
    const { useCases: { updateSocialLinksUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const email = req?.user?.email as string
            if (!email) {
                return res.status(400).json({ success: false, message: 'no email found' });
            }
            const { instagram, facebook, twitter, linkedin } = req.body
            const updateData = {}
            if (instagram !== undefined) updateData['socialLinks.instagram'] = instagram || null;
            if (facebook !== undefined) updateData['socialLinks.facebook'] = facebook || null;
            if (twitter !== undefined) updateData['socialLinks.twitter'] = twitter || null;
            if (linkedin !== undefined) updateData['socialLinks.linkedIn'] = linkedin || null;
            const data = await updateSocialLinksUsecase(dependencies).execute(updateData, email)
            if (data) {
                try {
                    await companySocialLinksUpdateConsumer(data)
                } catch (error: any) {
                    console.log('company social links updation producer failed', error)
                }
                return res.status(200).json({ success: true, message: 'updated successfully', data })
            } else {
                return res.status(404).json({ success: false, message: 'No data found to update' });
            }
        } catch (error: any) {
            console.error(error?.message, 'error updating social links')
            next(error)
        }
    }
}