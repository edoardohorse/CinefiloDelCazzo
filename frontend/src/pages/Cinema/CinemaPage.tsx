import { Card } from '@telegram-apps/telegram-ui';
import type { FC} from 'react';
import { Fragment } from 'react';
// import { Page } from '@/components/Page.tsx';

export const CinemaPage: FC = () => {
  return (
		  <Card type="ambient">
			  <>
				  <Card.Chip readOnly>
					  Anime
				  </Card.Chip>
				  <img
					  alt="Dog"
					  src="../../../public/lupin.jpg"
					  style={{
						  display: 'block',
						  height: 308,
						  objectFit: 'cover',
						  width: 254
					  }}
				  />
				  <Card.Cell
					  readOnly
					  subtitle="17-19 Nov 25"
				  >
					  Lupin
				  </Card.Cell>
			  </>
		  </Card>
  );
};