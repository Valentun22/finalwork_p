import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common'
import { AccountTypeEnum } from '../../../database/enums/account-type.enum'
import { UserRepository } from '../../../repository/services/user.repository'

@Injectable()
export class MoreVenueAllowedGuardAllowedGuard implements CanActivate {
	constructor(private readonly userRepository: UserRepository) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()
		const userVenueId = request.params.userId
		const userWithVenue = await this.userRepository.findOne({
			where: { id: userVenueId },
			relations: ['venue'],
		})
		if (
			userWithVenue.accountType === AccountTypeEnum.BASE_ACCOUNT &&
			userWithVenue.venues.length > 0
		) {
			throw new ForbiddenException(
				`Error. To add more ads, upgrade to ${AccountTypeEnum.CRITIC_ACCOUNT} account.`
			)
		}
		return true
	}
}
