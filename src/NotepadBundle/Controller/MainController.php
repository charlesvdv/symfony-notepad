<?php

namespace NotepadBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class MainController extends Controller
{
    /**
     * @Route("/", name="home")
     */
    /*
    public function indexAction(Request $request)
    {
        $data = array();
        $form = $this->createFormBuilder($data)
            ->add('tag', TextType::class, array('required'=>false))
            ->add('submit', SubmitType::class, array('label' => 'Search'))
            ->getForm();

        $form->handleRequest($request);
        $em = $this->getDoctrine()->getManager();
        $notes = $em->getRepository('NotepadBundle:Note')->findAll();

        if (!$notes) {
            $this->addFlash('notice', 'No notes. Please try to add some.');
        }
        if ($form->isValid()) {
            // Check for tags.
            $tag = $form->getData()['tag'];
            $filtered_notes = array();
            foreach ($notes as $note) {
                $xml = new \DOMDocument();
                $xml->loadXML('<content>'.$note->getContent().'</content>');
                $xpath = new \DOMXPath($xml);
                $elements = $xpath->query('//tag');

                foreach ($elements as $elem) {
                    if ($elem->textContent == $tag) {
                        $filtered_notes[] = $note;
                        break;
                    }
                }
            }
            if (sizeof($filtered_notes) > 0) {
                $notes = $filtered_notes;
            }
        }
        return $this->render('NotepadBundle:Default:index.html.twig',
            array('notes' => $notes, 'form' => $form->createView()));
    }
    */

    /**
     * @Route("/", name="home")
     */
    public function indexAction() {
        return $this->render('NotepadBundle:Default:index.html.twig');
    }
}
